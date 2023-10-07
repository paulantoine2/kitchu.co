import { remark } from "remark"
import html from "remark-html"

import "./markDownToHTML.css"

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
