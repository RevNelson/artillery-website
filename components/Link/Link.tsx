import { HTMLProps } from "react"
import NextLink from "next/link"

const Link = (props: HTMLProps<HTMLAnchorElement>) => {
  let { href, title, target, className, children, ...rest } = props
  return (
    <NextLink href={href || ""} passHref>
      <a title={title} target={target} {...rest} className={className}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
