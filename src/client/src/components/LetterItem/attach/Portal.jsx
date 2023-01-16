import {createPortal} from "react-dom";
import {useEffect} from "react";

/**
 * Компонент портала для вставки поповеров.
 * @param children
 * @returns {React.ReactPortal}
 * @constructor
 */
const Portal = ({children}) => {
    const mount = document.getElementById("portal-overlay");
    const el = document.createElement("div");

    useEffect(() => {
        mount.appendChild(el);
        return () => {
            mount.removeChild(el);
        }
    }, [el, mount]);

    return createPortal(children, el)
};

export default Portal;