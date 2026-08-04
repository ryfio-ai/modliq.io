# Modliq Authentication & Token Security

> **Last verified:** 2026-08-04  
> **Source of truth:** Current codebase inspection  
> **Status:** Implemented / Launch-Ready  

---

## 🔒 Token & Password Security Policies

1. **Password Hashing**: User passwords hashed using `bcrypt` with salt round $\ge 10$. Raw passwords are never stored or logged.
2. **JWT Signing**: Bearer tokens signed with high-entropy secret (`JWT_SECRET`). Tokens expire in 7 days.
3. **Session Revocation**: OAuth sessions managed via NextAuth and persisted in the `Session` model in MongoDB Atlas.

---

## 🔗 Related Documentation

- [AUTHORIZATION.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/03-backend/AUTHORIZATION.md) — Auth middleware rules
- [SECURITY_OVERVIEW.md](file:///c:/Users/sathish/Desktop/Modliq/Modliq/docs/07-security/SECURITY_OVERVIEW.md) — Security overview
