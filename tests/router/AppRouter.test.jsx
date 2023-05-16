const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../src/auth/context/AuthContext");
const { MemoryRouter } = require("react-router-dom");
const { AppRouter } = require("../../src/router/AppRouter");

describe("Pruebas en <AppRouter />", () => {
  test("Debe de mostrar el login si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Login").length).toBe(2);
  });

  test("Debe de mostrar el componente de Marvel si está autenticado", () => {
    const contextValue = {
      logged: true,
      user: { id: "123", name: "Test" },
    };

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Marvel").length).toBeGreaterThanOrEqual(1);
  });
});
