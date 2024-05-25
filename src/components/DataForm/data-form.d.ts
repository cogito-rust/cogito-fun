declare namespace NDataFormWidget {
  interface UpdateMetaValuesAndActiveField {
    (
      activeField: Record<string, any>,
      fieldValues: Record<string, any>,
      isValid?: boolean
    ): void;
  }
}
