import { all, call, put } from "redux-saga/effects";
import { notification } from "antd";

import usbcopyUpdatesSaga from "./UsbCopyUpdates/saga";

// Here you can include all the saga which you write for components
export default function* rootSaga() {
  yield all([
    usbcopyUpdatesSaga(),
  ]);
}

export function* callApi(apiFunction: any, ...args: any) {
  try {
    // yield call(() => getCustomRequest('sanctum/csrf-cookie'));
    const host = import.meta.env.VITE_SERVER_BASE_URL;
    const liveHost = `${window.location.protocol}//${window.location.host}/`;

    const response = yield call(apiFunction, ...args);
    console.log('callApi============================>', typeof response?.data, typeof response?.data === 'string', response?.data instanceof String)
    if (typeof response?.data === 'string' && response.data.includes('Please request access by validating your email address.')) {
      window.location.href = `${host}/resources/alpha_test/enter_email.php`
    }
    handleSuccessfulResponse(response);
    return response.data;
  } catch (error: any) {
    // if (error.response.status === 401) yield put({ type: actions.LOGOUT });
    // if (error.response.data.error.includes("createdBy"))
    //   yield put({ type: actions.LOGOUT });
    // if (error.response.data.error.includes("domainId"))
    //   yield put({ type: actions.LOGOUT });
    handleError(error);
    throw error;
  }
}

function handleSuccessfulResponse(response: any) {
  if ((response.status === 201 || response.status === 200) && response.data.message) {
    showNotification("success", "Success!", response.data.message);
  }
}

function handleError(error: any) {
  if (error.response) {
    const errorHandlerMapping = {
      401: () =>
        showNotification(
          "error",
          "No Authorization",
          "You did not authorizate"
        ),
      404: () => {
        // const errorMessages = error.response.data.message;
        // showNotification(
        //   'warning',
        //   '404 feil',
        //   `Det er ingen gyldige data. Opprett nye data.`
        // );
      },
      403: () => {
        // const errorMessages = error.response.data.message;
        // showNotification(
        //   'warning',
        //   '403 feil',
        //   `Det er ingen gyldige data. Opprett nye data.`
        // );
      },
      500: () => {
        console.log("error message", error.response.data.error);
        if (error.response.data.error.includes("createdBy")) {
          showNotification(
            "error",
            "No Authorization",
            "You did not authorizate"
          );
        } else {
          showNotification(
            "error",
            "Midlertidig serverproblem",
            "Vi opplever for øyeblikket noen tekniske problemer. Våre ingeniører jobber med saken, og vi håper å ha det løst snart. Vennligst prøv igjen senere."
          );
        }
      },
      422: () => {
        const validationErrors = error.response.data.message;
        const errorMessages = Object.values(validationErrors).flat().join("\n");

        showNotification(
          "error",
          "Validering mislyktes",
          `Det ser ut til at det var et problem med informasjonen som ble gitt: ${errorMessages} Vennligst sjekk og prøv igjen.`
        );
      },
    };
    const errorHandler =
      errorHandlerMapping[error.response.status as keyof typeof errorHandlerMapping] ||
      (() =>
        showNotification(
          "error",
          "Uventet feil",
          `Oops, noe gikk galt: ${error.response.data.message}. Vennligst prøv igjen, eller kontakt support hvis problemet vedvarer.`
        ));
    errorHandler();
  }
}

function showNotification(type: any, title: any, message: any) {
  notification[type as 'success' | 'error' | 'info' | 'warning']({
    duration: 5,
    message: title,
    description: message,
  });
}
