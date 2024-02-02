const InitialState = {
  user: {
    customerId: JSON.parse(localStorage.getItem("customerDetails"))?.customerId ?? null,
    customerName: JSON.parse(localStorage.getItem("customerDetails"))?.customerName ?? "User",
    phoneNumber: JSON.parse(localStorage.getItem("customerDetails"))?.phoneNumber ?? "",
  },
};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "logout": {
      return {
        ...state,
        user: {
          customerId:null,
        },
      };
    }

    default:
      return state;
  }
};
