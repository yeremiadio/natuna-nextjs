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
            ? "text-gray-800 font-medium transition ease-in-out delay-75"
            : "text-gray-400 hover:text-gray-800 font-medium transition ease-in-out delay-75"
        }
      >
        {name}
      </a>
    </Link>
  );
}

export default ActiveLink;
