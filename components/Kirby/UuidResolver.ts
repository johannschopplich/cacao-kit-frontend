interface UuidResolverOptions {
  uuid: string
  collection: ({ uuid: string } & Record<string, any>)[]
}

export default /* #__PURE__ */ defineComponent<UuidResolverOptions>({
  props: ['uuid', 'collection'] as unknown as undefined,
  setup(props, { slots }) {
    // Create a resolver function that resolves the file UUIDs to the actual image data,
    // since images inside structures are not resolved server-side
    const resolver = createUuidResolver(props.collection)

    const data = reactive({
      item: resolver(props.uuid),
    })

    return () => {
      if (slots.default) return slots.default(data)
    }
  },
})
