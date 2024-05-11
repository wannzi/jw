export default {
  data() {
    return {
      isShowPopUp1: false,
      isShowPopUp2: false,
      popup1: 'popup1',
      popup2: 'popup2',
    };
  },
    methods: {
      showPopUp1() {
        this.isShowPopUp1 = true;
      },
      showPopUp2() {
        this.isShowPopUp2 = true;
      },
      updateVisible(payload) {
        if (payload.popupId === this.popup1) {
          this.isShowPopUp1 = payload.visible;
        } else if (payload.popupId === this.popup2) {
          this.isShowPopUp2 = payload.visible;
        }
      }
    },
  }