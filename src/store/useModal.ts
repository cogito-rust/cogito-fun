/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
// import { Modal } from "src/containers/Modals";

// import useUser from "./useUser";

type ModalState = {
  [key in string]: boolean;
};

interface ModalActions {
  setVisible: (modal: any) => (visible: boolean) => void;
}

const initialStates: any= {
  clear: false,
  cloud: false,
  download: false,
  import: false,
  account: false,
  node: false,
  share: false,
  premium: false,
  schema: false,
  cancelPremium: false,
  review: false,
  jq: false,
  type: false,
};

const useModal = create<ModalState & ModalActions>()((set) => ({
  ...initialStates,
  setVisible: (modal) => (visible) => {
    set({ [modal]: visible });
  },
}));

export default useModal;
