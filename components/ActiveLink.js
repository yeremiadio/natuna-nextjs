import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ name, href, ...props }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={
          router.asPath === href ||
          router.pathname === href ||
          router.asPath === props.as
            ? "text-primary font-bold transition ease-in-out delay-75"
            : "text-secondary hover:text-primary font-medium transition ease-in-out delay-75"
        }
      >
        {name}
      </a>
    </Link>
  );
}

export default ActiveLink;
