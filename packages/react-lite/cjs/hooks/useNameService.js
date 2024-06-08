"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNameService = void 0;
const core_1 = require("@cosmos-kit/core");
const react_1 = require("react");
const useManager_1 = require("./useManager");
const useNameService = (name) => {
    const [state, setState] = (0, react_1.useState)(core_1.State.Pending);
    const [ns, setNS] = (0, react_1.useState)();
    const [msg, setMsg] = (0, react_1.useState)();
    const { defaultNameService, getNameService } = (0, useManager_1.useManager)();
    const registry = (0, react_1.useMemo)(() => (0, core_1.getNameServiceRegistryFromName)(name || defaultNameService), [name]);
    if (!registry) {
        throw new Error('No such name service: ' + (name || defaultNameService));
    }
    (0, react_1.useEffect)(() => {
        getNameService()
            .then((ns) => {
            setNS(ns);
            setState(core_1.State.Done);
        })
            .catch((e) => {
            setMsg(e.message);
            setState(core_1.State.Error);
        })
            .finally(() => {
            if (state === 'Pending') {
                setState(core_1.State.Init);
            }
        });
    }, [name]);
    return {
        state,
        data: ns,
        message: msg,
    };
};
exports.useNameService = useNameService;
