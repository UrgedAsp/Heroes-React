const { render, screen } = require("@testing-library/react");
const { PublicRoute } = require("../../src/router/PublicRoute");
const { AuthContext } = require("../../src/auth");
const { MemoryRouter, Routes, Route } = require("react-router-dom");

describe("Pruebas en <PublicRoute />", () => {
  test("debe de mostrar el children si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta pública</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta pública")).toBeTruthy();
  });

  test("debe de navegar si esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Sebastian",
        id: "123",
      },
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta Pública</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Página de marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Página de marvel")).toBeTruthy();
  });
});
