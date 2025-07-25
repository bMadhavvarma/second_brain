import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./Icons/PlusIcon";
import ShareIcon from "./Icons/ShareIcon";

const App = () => {
  return (
    <div>
      <div>
        <div className="flex justify-end gap-2 p-4 ">
          <Button
            text="Add Content"
            varient="primary"
            startIcon={<PlusIcon />}
          />
          <Button
            text="Share brain"
            varient="secondary"
            startIcon={<ShareIcon />}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <Card
    title="hello"
    icon={<PlusIcon />}
    type="youtube"
    link="https://youtu.be/c2M-rlkkT5o?si=I3vAUiVbDlU5pH9N"
  />
  <Card
    title="namstey"
    icon={<ShareIcon />}
    type="youtube"
    link="https://youtu.be/jO9DaqRG6vg?si=eEY0PhEivsW-uCKw"
  />
  <Card
    title="twitter post"
    icon={<ShareIcon />}
    type="twitter"
    link="https://twitter.com/elonmusk/status/1234567890"
  />
  <Card
    title="twitter post"
    icon={<ShareIcon />}
    type="twitter"
    link="https://x.com/narendramodi/status/1948622470996517077"
  />
  
</div>

      </div>
    </div>
  );
};

export default App;
