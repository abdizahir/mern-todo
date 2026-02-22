const API_BASE = "http://localhost/api/users";

export async function signup ({email, password, name}) {
    const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password, name})
    });

    if(!res.ok) throw new Error((await res.json()).message || 'Signup failed');
    return res.json();
}

export async function login({email, password}) {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({email, password})
    });

    if(!res.ok) throw new Error((await res.json()).message || 'Login failed');
    return res.json();
}

export async function logout() {
    const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include"
    });

    if(!res.ok) throw new Error("logout failed");
    return res.json();
}