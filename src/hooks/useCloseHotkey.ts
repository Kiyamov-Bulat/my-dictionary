import useHotkey, {UseHotkeyOptions} from '../components/hotkeyManger/useHotkey';
import HOTKEYS from '../utils/hotkeys';

const useCloseHotkey = (onClose: () => void, isOpen: boolean, options: UseHotkeyOptions = {}) => {
    return useHotkey(HOTKEYS.CLOSE.key, onClose, { ...options, block: options.block ?? !isOpen });
};

export default useCloseHotkey;