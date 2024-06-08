import { ICON } from '../constant';
export const cosmjsExtensionInfo = {
    name: 'cosmjs-extension',
    prettyName: 'Cosmjs',
    logo: ICON,
    mode: 'extension',
    mobileDisabled: () => !('cosmjs' in window || /CosmjsCosmos/i.test(navigator.userAgent)),
    rejectMessage: {
        source: 'Request rejected',
    },
    connectEventNamesOnWindow: ['cosmjs_keystorechange'],
};
