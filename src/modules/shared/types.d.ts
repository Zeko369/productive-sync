export interface JSONApi<Type, Attrs, Relationships = undefined> {
  data: {
    id: string;
    type: Type;
    attrs: Attrs;
    relationships: Relationships;
  };
}
