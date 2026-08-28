const API_URL = import.meta.env.VITE_API_URL;


console.log(
  "API URL", API_URL
)


export interface LoginResponse {
    user: {
        id: string;
        firstName: string;
        lastName?: string;
        email: string;
        avatarUrl?: string | null;
        role: string;
    };
    token: string;
}

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
}

export async function logout(): Promise<void> {

    const token = localStorage.getItem("token");

    if (token) {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function getCurrentUser() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("token"));
}
