interface UuidResolverOptions {
  uuid: string
  collection: ({ uuid: string } & Record<string, any>)[]
}

// Resolve a given UUID to an item in a collection, especially useful for
// files that are not resolved server-side
export default /* #__PURE__ */ defineComponent<UuidResolverOptions>({
  props: ['uuid', 'collection'] as unknown as undefined,
  setup(props, { slots }) {
    const data = reactive({
      item: resolveUuid(props.collection, props.uuid),
    })

    return () => {
      if (slots.default) return slots.default(data)
    }
  },
})
