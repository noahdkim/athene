const devotionals = {
  mainTab: {
    name: 'devotionals',
    route: '/devotionals/view'
  },
  subTabs: [
    {
      name: 'View',
      route: '/devotionals/view'
    },
    {
      name: 'Create',
      route: '/devotionals/create'
    },
    {
      name: 'Analytics',
      route: '/devotionals/analytics'
    }
  ]
}

const reading = {
  mainTab: {
    name: 'reading',
    route: '/reading/view'
  },
  subTabs: [
    {
      name: 'View',
      route: '/reading/view'
    },
    {
      name: 'Create',
      route: '/reading/create'
    }
  ]
}

export const tabs = {
  devotionals: devotionals,
  reading: reading
}
