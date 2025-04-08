import { theme } from "../../../theme";

interface ISpanColor {
  color?: string;
  bold?: boolean;
  children: React.ReactNode;
}

export const SpanColor = ({ color, bold, children }: ISpanColor) => {
  return (
    <span style={{
      color: color ?? theme.palette.info.main,
      fontWeight: bold ? "bold" : ""
    }}
    >
      {children}
    </span>
  )
}
