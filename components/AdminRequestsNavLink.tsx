"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type AdminRequestsNavLinkProps = {
  locale: Locale;
  className?: string;
  activeClassName?: string;
  currentPath?: string;
};

export function AdminRequestsNavLink({
  locale,
  className,
  activeClassName,
  currentPath,
}: AdminRequestsNavLinkProps) {
  const client = useMemo(() => generateClient<any>(), []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const requestsHref = withLocale(locale, "/requests");

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.accessToken?.payload?.["cognito:groups"] as string[] | undefined) ?? [];
        const admin = groups.includes("ADMIN");

        if (!mounted) return;
        setIsAdmin(admin);

        if (!admin) {
          setNewCount(0);
          return;
        }

        const { data } = await client.models.ServiceRequest.list({ limit: 500 });
        if (!mounted) return;
        setNewCount(data.filter((item: any) => item.status === "NEW" || !item.status).length);
      } catch {
        if (!mounted) return;
        setIsAdmin(false);
        setNewCount(0);
      }
    };

    check();
    const timer = setInterval(check, 30000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [client]);

  if (!isAdmin) {
    return null;
  }

  const combinedClassName = [className, currentPath === requestsHref ? activeClassName : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={requestsHref} className={combinedClassName || "admin-requests-link"}>
      Requests{newCount > 0 ? ` (${newCount})` : ""}
    </Link>
  );
}
