import { useLocation } from "react-router-dom";

/**
 * get query string parameters of current URL
 */
export default function useQueryStringParams() {
  return new URLSearchParams(useLocation().search);
}
