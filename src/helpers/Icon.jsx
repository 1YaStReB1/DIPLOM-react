import { HandySvg } from "handy-svg";

export const Icon = ({src, name}) => (
  <HandySvg
    src={src}
    className={`icon icon__${name}`}
    width="32"
    height="32"
  />
);

