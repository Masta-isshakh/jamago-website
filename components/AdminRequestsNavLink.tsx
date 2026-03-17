"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";

type AdminRequestsNavLinkProps = {
  locale: Locale;
};

export function AdminRequestsNavLink({ locale }: AdminRequestsNavLinkProps) {
  const client = useMemo(() => generateClient<any>(), []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newCount, setNewCount] = useState(0);

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

  return (
    <Link href={withLocale(locale, "/requests")} className="admin-requests-link">
      Requests{newCount > 0 ? ` (${newCount})` : ""}
    </Link>
  );
}
