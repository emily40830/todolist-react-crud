

const AuthForm = () => {
  const match = useRouteMatch();


  return (
    <div className="form-block p-4 d-flex justify-content-center align-content-center flex-wrap">
      <div>
        {!isSignup ? null : (
          <Input
            option={{ title: "電子信箱", type: "email", key: "email" }}
            value={user.email}
            handleChange={handleChange}
            error={error.email}
          ></Input>
        )}
        <Input
          option={{ title: "使用者名稱", key: "username" }}
          value={user.username}
          handleChange={handleChange}
          error={error.username}
        ></Input>
        <Input
          option={{ title: "密碼", type: "password", key: "password" }}
          value={user.password}
          handleChange={handleChange}
          error={error.password}
        ></Input>
        <div>
          {isSignup ? (
            <button
              onClick={checkInput}
              className={`btn btn-primary mt-2 ${loading ? "disabled" : ""}`}
            >
              註冊
            </button>
          ) : (
            <button
              onClick={checkInput}
              className={`btn btn-primary mt-2 ${loading ? "disabled" : ""}`}
            >
              登入
            </button>
          )}
        </div>
      </div>
      {loading && (
        <div className="loading-fixed-block d-flex justify-content-center align-content-center flex-wrap">
          <Loading
            text={isSignup ? "註冊中, 請稍候" : "登入中, 請稍候"}
          ></Loading>
        </div>
      )}
      {alert.show && (
        <div className="fixed-top">
          <Alert variant={alert.variant}>{alert.text}</Alert>
        </div>
      )}
      <Modal
        modalShow={modalShow}
        option={{
          title: "提醒",
          content: `註冊成功, 請登入`,
          noCancel: true,
        }}
        handelModalShow={handelModalShow}
        onHide={() => handleClick("toLogin")}
        handleClick={() => handleClick("toLogin")}
      ></Modal>
    </div>
  );
}