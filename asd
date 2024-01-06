<form onSubmit={handleLogin}>
    <div className="mb-3">
      <input
        type="email"
        className="form-control"
        id="email"
        aria-describedby="emailHelp"
        placeholder="Email"
        value={email}  // Add this line to bind the value to the state
        onChange={(e) => setEmail(e.target.value)}  // Add this line to update the state
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Şifre"
        value={password}  // Add this line to bind the value to the state
        onChange={(e) => setPassword(e.target.value)}  // Add this line to update the state
      />
    </div>
    <div className="d-grid gap-2">
      <button type="submit" className="btn btn-orange btn-lg">
        Giriş Yap
      </button>
    </div>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
  </form>
