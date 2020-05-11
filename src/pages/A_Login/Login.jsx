import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Qrcode from '@/components/Qrcode'
import AppConf from "@/config/app.config";
import { Form, Icon, Input, Button, message } from "antd";
const { Item } = Form;
import { Encrypt } from "@/Libs/Utils/aes";
import { login, qrLoginStatus } from "@/services";
import styles from "./login.scss";
import logo from "./logo.png";
/**
 * 系统登录模块
 */
import loginSchema from "@/schema/loginSchema";
import InitUserInfo from "@/Libs/Hoc/InitUserInfo";
import useData from '@/hooks/useData';

let appLoginState = null
const Login = ({ location }) => {
    let AppCfg = { ...AppConf, ...AppConfig }
    const locale = app.globalRedux.getContext()
    const [data, getData] = InitUserInfo()
    const initValue = process.env.NODE_ENV == 'production' ? {
        phone: "",
        password: "",
        loading: false,
        loginKey: null
    } : {
            phone: "18672035432",
            password: "12345678",
            loading: false,
            loginKey: null
        }
    const [user, setUser] = useData(initValue)
    let { loginKey, phone } = user
    const handleQrLoginStatus = async (loginKey) => {
        let res = await qrLoginStatus({ loginKey })
        if (res.success) {
            let status = res.body.status
            if (status == 1) {
                memoryStorage.setItem('sessionKey', res.body.sessionKey)
                memoryStorage.setItem('token', res.body.token);
                getData();
            } else if (status == 0) {
                appLoginState = setTimeout(() => handleQrLoginStatus(loginKey), 1000)
            } else if (status == 2) {
                setUser({ loading: false, loginKey: null });
                message.error(res.message)
            }
        } else {
            appLoginState = setTimeout(() => handleQrLoginStatus(loginKey), 1000)
        }
    }
    useEffect(() => {
        if (!loginKey) {
            clearTimeout(appLoginState)
            return
        }
        handleQrLoginStatus(loginKey)
    }, [loginKey])
    const handleLogin = async data => {
        setUser({ loading: true });
        let res = await login(data);
        if (res.success) {
            if (data.userName == 'admin' || AppCfg.noqrcode) {
                memoryStorage.setItem('sessionKey', res.body.sessionKey)
                memoryStorage.setItem('token', res.body.token);
                setUser({ loading: false });
                getData();
            }
            else {
                setUser({ loading: false, loginKey: res.body.loginKey });
            }
        } else {
            setUser({ loading: false, loginKey: null });
            memoryStorage.removeItem("sessionKey");
            memoryStorage.removeItem("token");
        }
    };
    const handleSubmit = async e => {
        e.preventDefault();
        let rs = app.jsonschema(loginSchema, {
            phone: user.phone,
            password: user.password
        });
        if (!rs.valid) {
            message.error(rs.errors[0].message);
            return false;
        }
        let aesPassword = Encrypt(user.password, AppConf.aesKey, AppConf.ivKey); //加密
        let postdata = {
            userName: user.phone,
            aesPassword
        };
        handleLogin(postdata);
    };
    const sessionKey = locale.context.sessionKey
    if (sessionKey) {
        return <Redirect to={location.state || "/"} />;
    }

    return (
        <div className={styles.login}>
            <div className={styles.top}>
                <img className={styles.logo} src={logo} />
            </div>
            {loginKey ?
                <div className={styles.applogin}>
                    <Qrcode text={AppCfg.qscodeUrl + "?loginKey=" + loginKey + "&username=" + phone} style={{ margin: "0 auto" }} />
                    {/* <Qrcode text={"https://yssjcms.estv.com.cn/qscode/test/qscode.html?loginKey=" + loginKey + "&username=" + phone} style={{ margin: "0 auto" }} /> */}
                    <div className={styles.appqs}>请在云上恩施系列APP中扫码上方二维码确认登录</div>
                </div> :
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <Item>
                        <Input
                            onChange={e => setUser({ "phone": e.target.value })}
                            value={user.phone}
                            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="用户名"
                        />
                    </Item>
                    <Item>
                        <Input
                            onChange={e => setUser({ "password": e.target.value })}
                            type="password"
                            value={user.password}
                            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                            placeholder="密码"
                        />
                    </Item>
                    <Button type="primary" size="large" loading={user.loading} htmlType="submit" className={styles.btn}>登录</Button>
                </Form>
            }
            <div className={styles.copyright}>湖北云上视界信息科技有限公司版权所有</div>
        </div>
    );
}

export default Login