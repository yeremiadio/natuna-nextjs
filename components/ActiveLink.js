import { useRouter } from "next/router";
import Link from "next/link";

function ActiveLink({ name, href }) {
  const router = useRouter();
  console.log(router.asPath);
  console.log(router.pathname);
  return (
    <Link href={href}>
      <a
        className={
          router.asPath === href || router.pathname === href
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
