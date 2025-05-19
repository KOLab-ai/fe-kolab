"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GoogleCallbackPage = () => {
	const router = useRouter();

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get("code");

			if (!code) {
				// Optional: show error message
				router.replace("/login?error=missing_code");
				return;
			}

			try {
				const res = await fetch("http://localhost:8000/api/v1/auth/google/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ code }),
				});
				const data = await res.json();

				if (!res.ok) {
					router.replace("/login?error=backend");
					return;
				}

				console.log(data);

				// Option A: Store token in localStorage (not ideal for security)
				// localStorage.setItem('access_token', data.access_token)

				// Option B: Redirect; assume backend sets HttpOnly cookie
				// router.replace("/dashboard");
			} catch (err) {
				console.error(err);
				router.replace("/login?error=network");
			}
		};

		handleCallback();
	}, [router]);
	return <p>Logging you in...</p>;
};

export default GoogleCallbackPage;
