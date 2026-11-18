import { renderToString } from "react-dom/server";
import App from "./App";

export function render(route: string): string {
  return renderToString(<App initialRoute={route} />);
}
