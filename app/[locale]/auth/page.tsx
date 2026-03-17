"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { isLocale, withLocale, type Locale } from "@/lib/i18n";

export default function AuthPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.accessToken?.payload?.["cognito:groups"] as string[] | undefined) ?? [];
        setIsAdmin(groups.includes("ADMIN"));
      } catch {
        setIsAdmin(false);
      }
    };
    run();
  }, []);

  return (
    <section className="card auth-card">
      <h1>{locale === "ar" ? "تسجيل الدخول" : "Login / Sign up"}</h1>
      <p>
        {locale === "ar"
          ? "المشرفون سيظهر لهم رابط الطلبات تلقائيًا بعد تسجيل الدخول."
          : "ADMIN users will automatically see the Requests link after login."}
      </p>

      <Authenticator>
        {({ user }) => (
          <div className="auth-success">
            <p>
              {locale === "ar" ? "تم تسجيل الدخول باسم:" : "Signed in as:"} <strong>{user?.signInDetails?.loginId ?? user?.username}</strong>
            </p>
            <div className="wizard-actions">
              <button type="button" onClick={() => router.push(isAdmin ? withLocale(locale, "/requests") : withLocale(locale, "/services"))}>
                {isAdmin
                  ? locale === "ar"
                    ? "الذهاب إلى الطلبات"
                    : "Go to Requests"
                  : locale === "ar"
                    ? "الذهاب إلى الخدمات"
                    : "Go to Services"}
              </button>
              <button type="button" onClick={() => signOut()}>
                {locale === "ar" ? "تسجيل الخروج" : "Sign out"}
              </button>
            </div>
          </div>
        )}
      </Authenticator>
    </section>
  );
}
