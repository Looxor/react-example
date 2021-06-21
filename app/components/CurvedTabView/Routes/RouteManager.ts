class RoutesManager {
  routes: Array<any>;

  constructor() {}

  loadRoutes(routes: Array<any>) {
    const validRoutes = this.validateRoutes(routes);
    const _routes = [];
    validRoutes.map((route: any, index: number) => {
      const {title, scene, labelStyle} = route.props;
      _routes.push({
        index,
        key: index,
        title,
        scene,
        labelStyle,
      });
    });

    this.routes = _routes;
    return this.routes;
  }

  getSceneMap() {
    const sceneMap = {};
    this.routes.map(route => (sceneMap[String(route.key)] = route.scene));
    return sceneMap;
  }

  private validateRoutes = routes =>
    routes.constructor && routes.constructor.name === 'Array'
      ? routes
      : [routes];
}

export default new RoutesManager();
