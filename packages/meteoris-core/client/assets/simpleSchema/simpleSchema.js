MeteorisSimpleSchema = {
    error: function(collections, field) {
        var namedContext = collections.simpleSchema().namedContext();
        var result = "";
        namedContext.invalidKeys().forEach(function(i) {
            if (i.name == field)
                result = namedContext.keyErrorMessage(i.name);
        });
        return result;
    },
};

/* UNCOMMENT TO USE INDONESIAN FORMAT VALIDATION */
/*
 SimpleSchema.messages({
 //CUSTOM
 unique: "[label] sudah dibuat/digunakan",
 sameLocation: "[label] tidak boleh sama dengan Dari Lokasi",
 oneMustBeFilled: "salah satu debit atau kredit harus diisi",
 unableToFillBoth: "debit/kredit hanya dapat diisi salah satu",
 //DEFAULT
 required: "[label] harus diisi",
 minString: "[label] paling sedikit harus [min] karakter",
 maxString: "[label] tidak boleh lebih dari [max] karakter",
 minNumber: "[label] paling sedikit harus [min]",
 maxNumber: "[label] tidak boleh lebih dari [max]",
 minDate: "[label] harus sebelum [min]",
 maxDate: "[label] tidak bisa setelah [max]",
 minCount: "Anda harus menentukan setidaknya [minCount] inputan",
 maxCount: "Anda tidak boleh menginput lebih dari [maxCount] inputan",
 noDecimal: "[label] harus berupa integer",
 notAllowed: "[value] adalah inputan yang tidak diperbolehkan",
 expectedString: "[label] harus berupa huruf",
 expectedNumber: "[label] harus berupa angka",
 expectedBoolean: "[label] harus berupa boolean",
 expectedArray: "[label] harus berupa array",
 expectedObject: "[label] harus berupa object",
 expectedConstructor: "[label] harus berupa [type]",
 regEx: "[label] gagal memvalidasi reguler expression"
 });
 */