import { css } from "@emotion/react";

export const outerTextStroke = (
  fillColor: string,
  strokeColor: string,
  strokeWidth: string,
) => css`
  position: relative;
  color: ${strokeColor};
  -webkit-text-stroke: ${strokeWidth} ${strokeColor};

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    right: 0;
    color: ${fillColor};
    -webkit-text-stroke: 0;
  }
`;
