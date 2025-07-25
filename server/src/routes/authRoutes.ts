import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import UserModel from '../models/User';
import userAuth from '../middlewares/userAuth';
import { Content, Tag } from '../models/Content';
import { LinkModel } from '../models/Link';
import { random } from '../utils/random';
config(); 
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already taken'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = await UserModel.create({
      userName,
      password: hashedPassword
    });

    // Do not send password back
    const userWithoutPassword = {
      _id: newUser._id,
      userName: newUser.userName,
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      //@ts-ignore
      error: error.message || error
    });
  }
});

// ----------------------- Signin Route -----------------------
router.post('/signin', async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check user existence
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // Send user info excluding password
    const userInfo = {
      _id: user._id,
      userName: user.userName,
    };

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: userInfo,
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error signing in user',
      //@ts-ignore
      error: error.message || error
    });
  }
});
router.post('/content', userAuth, async (req, res) => {
  const { title, link, type, tags } = req.body;
  if (!title || !type || !tags || !Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Title, type, and tags (array) are required'
    });
  }
  try {
    // Find or create tags and collect their ObjectIds
    const tagIds = await Promise.all(tags.map(async (tagTitle) => {
      let tagDoc = await Tag.findOne({ title: tagTitle });
      if (!tagDoc) {
        tagDoc = await Tag.create({ title: tagTitle });
      }
      return tagDoc._id;
    }));
    const content = await Content.create({
      title,
      link,
      type,
      tag: tagIds,
      //@ts-ignore
      userId: req.user._id
    });
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating content',
      //@ts-ignore
      error: error.message || error
    });
  }
});

// GET /content - fetch all content for the authenticated user with tag names
router.get('/content', userAuth, async (req, res) => {
  try {
    //@ts-ignore
    const contents = await Content.find({ userId: req.user._id }).populate('tag', 'title');
    res.status(200).json({
      success: true,
      data: contents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      //@ts-ignore
      error: error.message || error
    });
  }
});

// DELETE /content/:id - delete a specific content by id for the authenticated user
router.delete('/content/:id', userAuth, async (req, res) => {
  try {
    const userId = (req.user && typeof req.user === 'object' && '_id' in req.user) ? (req.user as any)._id : undefined;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }
    const content = await Content.findOneAndDelete({ _id: req.params.id, userId });
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found or not authorized to delete'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
      data: content
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting content',
      error: error.message || error
    });
  }
});
router.post("/brain/share", userAuth, async (req, res) => {
  const { share } = req.body;

  try {
    // Ensure the user is authenticated and has a valid ID
    const userId = (req.user && typeof req.user === 'object' && '_id' in req.user) ? (req.user as any)._id : undefined;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (share) {
      // Check if a link already exists for the user
      const existingLink = await LinkModel.findOne({ userId });
      if (existingLink) {
        return res.status(200).json({ hash: existingLink.hash }); // Send existing hash if found
      }

      // Generate a new hash for the shareable link
      const hash = random(10);
      await LinkModel.create({ userId, hash });
      return res.status(201).json({ hash }); // Send new hash in the response
    } else {
      // Remove the shareable link if share is false
      await LinkModel.deleteOne({ userId });
      return res.status(200).json({ message: "Removed link" }); // Send success response
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error processing share request",
      error: error.message || error,
    });
  }
});

// Route 7: Get Shared Content
router.get("/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  // Find the link using the provided hash.
  const link = await LinkModel.findOne({ hash });
  if (!link) {
      res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
      return;
  }

  // Fetch content and user details for the shareable link.
  const content = await Content.find({ userId: link.userId });
  const user = await UserModel.findOne({ _id: link.userId });

  if (!user) {
      res.status(404).json({ message: "User not found" }); // Handle missing user case.
      return;
  }

  res.json({
      username: user.userName,
      content
  }); // Send user and content details in response.
});

export default router;
