"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";

type AdminRequestsBoardProps = {
  locale: "en" | "ar";
};

type RequestItem = {
  id: string;
  serviceName: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  locationLabel?: string;
  buildingNumber: string;
  notes?: string;
  status?: "NEW" | "CONTACTED" | "IN_PROGRESS" | "CLOSED";
  createdAt?: string;
};

const statuses: Array<RequestItem["status"]> = ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"];

export function AdminRequestsBoard({ locale }: AdminRequestsBoardProps) {
  const client = useMemo(() => generateClient<any>(), []);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    setLoading(true);
    const { data } = await client.models.ServiceRequest.list({ limit: 500 });
    const sorted = [...(data as RequestItem[])].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
    setRequests(sorted);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const session = await fetchAuthSession();
        const groups = (session.tokens?.accessToken?.payload?.["cognito:groups"] as string[] | undefined) ?? [];
        const admin = groups.includes("ADMIN");

        if (!mounted) return;
        setIsAdmin(admin);

        if (admin) {
          await loadRequests();
        } else {
          setLoading(false);
        }
      } catch {
        if (!mounted) return;
        setIsAdmin(false);
        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [loadRequests]);

  const updateStatus = async (id: string, status: RequestItem["status"]) => {
    await client.models.ServiceRequest.update({ id, status } as any);
    await loadRequests();
  };

  if (loading) {
    return <section className="card">Loading requests...</section>;
  }

  if (!isAdmin) {
    return (
      <section className="card">
        <h1>{locale === "ar" ? "غير مصرح" : "Unauthorized"}</h1>
        <p>{locale === "ar" ? "هذه الصفحة مخصصة للمشرفين فقط." : "This page is for ADMIN users only."}</p>
      </section>
    );
  }

  return (
    <section className="card admin-requests-board">
      <h1>{locale === "ar" ? "طلبات الخدمات" : "Service Requests"}</h1>
      <p>{locale === "ar" ? `إجمالي الطلبات: ${requests.length}` : `Total requests: ${requests.length}`}</p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{locale === "ar" ? "الخدمة" : "Service"}</th>
              <th>{locale === "ar" ? "العميل" : "Customer"}</th>
              <th>{locale === "ar" ? "الهاتف" : "Phone"}</th>
              <th>{locale === "ar" ? "الموقع" : "Location"}</th>
              <th>{locale === "ar" ? "المبنى" : "Building"}</th>
              <th>{locale === "ar" ? "الحالة" : "Status"}</th>
              <th>{locale === "ar" ? "التاريخ" : "Created"}</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>
                  <strong>{request.serviceName}</strong>
                  {request.notes ? <p className="muted">{request.notes}</p> : null}
                </td>
                <td>
                  <strong>{request.fullName}</strong>
                  {request.email ? <p className="muted">{request.email}</p> : null}
                </td>
                <td>{request.phoneNumber}</td>
                <td>{request.locationLabel ?? "-"}</td>
                <td>{request.buildingNumber}</td>
                <td>
                  <select
                    value={request.status ?? "NEW"}
                    onChange={(event) => updateStatus(request.id, event.target.value as RequestItem["status"])}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status ?? "NEW"}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{request.createdAt ? new Date(request.createdAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
