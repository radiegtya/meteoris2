MeteorisAlert = {
    confirm: function(msg, callback, kwargs) {
      swal({

          text: TAPi18n.__(msg, kwargs),

          title: TAPi18n.__("sure?", ""),
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: true,
          confirmButtonText: TAPi18n.__("proceed", ""),
          cancelButtonText: TAPi18n.__("cancel", ""),
          confirmButtonColor: "#337ab7"
        }, callback
      );

      //return confirm(msg + "XXX");
    }
};
