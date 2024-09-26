const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'NAVEGACIÓN',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'tareas',
          title: 'Tareas',
          type: 'collapse',
          icon: 'feather icon-calendar',
          children: [
            {
              id: 'new-task',
              title: 'Nueva tarea',
              type: 'item',
              url: '/tarea/add'
            },
            {
              id: 'list-task',
              title: 'Listar tareas',
              type: 'item',
              url: '/tarea/listado'
            }
          ]
        },
        {
          id: 'categorias',
          title: 'Categorías',
          type: 'collapse',
          icon: 'feather icon-list',
          children: [
            {
              id: 'new-cat',
              title: 'Nueva categoría',
              type: 'item',
              url: '/categoria/add'
            },
            {
              id: 'list-cat',
              title: 'Listar categorías',
              type: 'item',
              url: '/categoria/listado'
            }
          ]
        },
        {
          id: 'estados',
          title: 'Estados',
          type: 'collapse',
          icon: 'feather icon-check-square',
          children: [
            {
              id: 'new-est',
              title: 'Nueva estado',
              type: 'item',
              url: '/estado/add'
            },
            {
              id: 'list-est',
              title: 'Listar estados',
              type: 'item',
              url: '/estado/listado'
            }
          ]
        }
      ]
    }
  ]
};

export default menuItems;
