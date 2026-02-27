import { useParams } from "react-router-dom";
import { DEFAULT_LANG, isLang, Lang } from "./lang";

export function useLang(): Lang {
  const params = useParams();
  const langParam = params.lang;
  return isLang(langParam) ? langParam : DEFAULT_LANG;
}