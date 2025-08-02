import type { ReactElement } from "react";

interface CardProps {
  icon?: ReactElement;
  title?: string;
  type?: "youtube" | "twitter";
  link?: string;
}

const Card = (props: CardProps) => {
  return (
    <div className="bg-white border border-gray-200 shadow-md w-fit h-fit m-6 rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {props.icon}
          <h1 className="font-semibold text-lg">{props.title}</h1>
        </div>
        <div className="flex gap-2">
          {props.icon}
          {props.icon}
        </div>
      </div>

      {props.type === "youtube" && props.link && (
        <div className="aspect-video w-full space-y-2">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <iframe
              src={props.link
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "www.youtube.com/embed/")}
              title="YouTube video player"
              frameBorder="0"
              className="w-full h-full rounded"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </a>
        </div>
      )}

      {props.type==="twitter" && props.link &&(
        <div className="w-full space-y-2">
<blockquote className="twitter-tweet">
  <a href={props.link.replace("x.com","twitter.com")}></a>
</blockquote>
        </div>
      )}
    </div>
  );
};

export default Card;
