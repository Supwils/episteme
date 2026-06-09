import countriesTopology from '../../assets/maps/countries-110m.json';
import { projectGeo } from '@/content/human-history/data/geo-events.js';

export const MAP_W = 1200;
export const MAP_H = 600;

export const WORLD_LANDMASSES = {
  americas: {
    color: '#2D6A4F',
    label: [-105, 36],
    polygons: [
      [
        [-168, 71], [-150, 70], [-132, 59], [-124, 49], [-123, 38], [-116, 32],
        [-105, 23], [-93, 18], [-88, 19], [-83, 9], [-78, 8], [-81, 18],
        [-90, 22], [-97, 26], [-82, 25], [-75, 35], [-66, 45], [-54, 50],
        [-53, 57], [-60, 66], [-83, 73], [-115, 72], [-140, 70], [-160, 72],
      ],
      [
        [-82, 12], [-72, 11], [-62, 6], [-52, -4], [-45, -16], [-48, -28],
        [-58, -40], [-67, -55], [-73, -50], [-75, -36], [-80, -20], [-81, -4],
      ],
      [
        [-73, 59], [-58, 61], [-38, 67], [-20, 76], [-30, 82], [-52, 84],
        [-67, 78], [-73, 68],
      ],
    ],
  },
  europe: {
    color: '#1E3A5F',
    label: [15, 53],
    polygons: [
      [
        [-10, 36], [-9, 44], [-5, 50], [-8, 57], [2, 60], [8, 56],
        [18, 58], [30, 60], [41, 50], [31, 44], [29, 39], [19, 36],
        [8, 38], [0, 36],
      ],
      [[5, 58], [12, 70], [28, 72], [32, 63], [22, 58], [14, 56]],
      [[-10, 50], [-5, 59], [1, 58], [0, 51]],
      [[-10, 51], [-7, 55], [-5, 53], [-7, 50]],
      [[20, 35], [24, 39], [28, 37], [26, 34]],
    ],
  },
  africa: {
    color: '#8B4513',
    label: [20, 1],
    polygons: [
      [
        [-17, 35], [0, 37], [16, 33], [32, 31], [44, 12], [51, 2],
        [42, -12], [35, -29], [23, -35], [10, -35], [-3, -29], [-13, -15],
        [-17, 2], [-10, 20],
      ],
      [[47, -13], [50, -18], [49, -25], [44, -25], [43, -18]],
    ],
  },
  asia: {
    color: '#C8A951',
    label: [88, 39],
    polygons: [
      [
        [30, 41], [41, 55], [62, 61], [90, 70], [126, 68], [170, 60],
        [163, 50], [142, 44], [139, 36], [122, 23], [110, 12], [103, 2],
        [96, 5], [91, 17], [80, 8], [73, 20], [62, 25], [53, 24],
        [44, 30], [34, 35],
      ],
      [[35, 31], [45, 29], [56, 24], [52, 15], [43, 12], [36, 19]],
      [[121, 24], [126, 18], [124, 10], [117, 8], [110, 13], [112, 20]],
      [[129, 34], [140, 41], [145, 44], [142, 35], [132, 31]],
      [[95, 5], [105, 1], [118, -5], [130, -3], [125, -9], [108, -8], [96, -3]],
    ],
  },
  oceania: {
    color: '#4A148C',
    label: [137, -25],
    polygons: [
      [
        [113, -12], [129, -10], [146, -18], [154, -28], [145, -38],
        [131, -43], [117, -35], [112, -23],
      ],
      [[166, -35], [178, -38], [174, -46], [166, -44]],
      [[130, -3], [149, -5], [153, -10], [137, -10]],
    ],
  },
};

export const HISTORIC_ROUTES = [
  {
    label: '丝绸之路',
    labelAt: [68, 41],
    points: [[29, 41], [44, 34], [60, 38], [75, 41], [90, 43], [104, 36], [116, 34]],
  },
  {
    label: '海上丝路',
    labelAt: [62, 7],
    points: [[119, 24], [103, 1], [80, 7], [56, 23], [44, 12], [39, -6]],
  },
  {
    label: '大西洋航路',
    labelAt: [-38, 25],
    points: [[-9, 38], [-28, 31], [-50, 25], [-74, 20]],
  },
  {
    label: '白令迁徙线',
    labelAt: [-170, 58],
    points: [[-172, 65], [-162, 64], [-150, 61]],
  },
];

export const REFERENCE_BOUNDARIES = [
  { id: 'europe-asia', points: [[58, 66], [58, 55], [52, 47], [43, 40], [35, 36]] },
  { id: 'sahara', points: [[-17, 20], [0, 22], [16, 22], [32, 24]] },
  { id: 'sahel', points: [[-16, 13], [-4, 15], [12, 13], [28, 11], [38, 9]] },
  { id: 'us-canada', points: [[-124, 49], [-110, 49], [-95, 49], [-82, 46], [-67, 45]] },
  { id: 'us-mexico', points: [[-117, 32], [-108, 31], [-100, 29], [-97, 26]] },
  { id: 'andes', points: [[-78, 8], [-76, -8], [-73, -22], [-70, -38], [-68, -52]] },
  { id: 'mesoamerica', points: [[-104, 22], [-96, 18], [-88, 16], [-84, 10]] },
  { id: 'indian-subcontinent', points: [[68, 24], [76, 32], [88, 27], [88, 22], [80, 8], [72, 18]] },
  { id: 'china-core', points: [[76, 40], [92, 45], [111, 42], [122, 34], [119, 25], [105, 21], [90, 30]] },
  { id: 'middle-east', points: [[35, 32], [45, 36], [55, 31], [55, 24], [44, 24], [36, 28]] },
  { id: 'southeast-asia', points: [[95, 22], [103, 15], [106, 8], [105, 1], [114, -3], [124, -5]] },
];

const decodedArcCache = new Map();

function decodeArc(topology, arcIndex) {
  const sourceIndex = arcIndex < 0 ? ~arcIndex : arcIndex;
  if (!decodedArcCache.has(sourceIndex)) {
    const { scale, translate } = topology.transform;
    let x = 0;
    let y = 0;
    const points = topology.arcs[sourceIndex].map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [
        x * scale[0] + translate[0],
        y * scale[1] + translate[1],
      ];
    });
    decodedArcCache.set(sourceIndex, points);
  }

  const decoded = decodedArcCache.get(sourceIndex);
  return arcIndex < 0 ? [...decoded].reverse() : decoded;
}

function joinRing(topology, ring) {
  const points = [];
  for (const arcIndex of ring) {
    const arc = decodeArc(topology, arcIndex);
    const segment = points.length > 0 ? arc.slice(1) : arc;
    points.push(...segment);
  }
  return points;
}

function pointsToPath(points) {
  if (points.length === 0) return '';

  let previousLng = null;
  const path = points.map(([lng, lat], index) => {
    const { x, y } = projectGeo(lng, lat, MAP_W, MAP_H);
    const command = index === 0 || (previousLng !== null && Math.abs(lng - previousLng) > 180) ? 'M' : 'L';
    previousLng = lng;
    return `${command}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return `${path} Z`;
}

function polygonToPath(topology, polygon) {
  return polygon
    .map(ring => pointsToPath(joinRing(topology, ring)))
    .filter(Boolean)
    .join(' ');
}

function geometryToPath(topology, geometry) {
  if (!geometry?.arcs) return '';
  if (geometry.type === 'Polygon') return polygonToPath(topology, geometry.arcs);
  if (geometry.type === 'MultiPolygon') {
    return geometry.arcs
      .map(polygon => polygonToPath(topology, polygon))
      .filter(Boolean)
      .join(' ');
  }
  return '';
}

function buildCountryPaths(topology) {
  return topology.objects.countries.geometries
    .map(geometry => ({
      id: geometry.id,
      name: geometry.properties?.name || geometry.id,
      path: geometryToPath(topology, geometry),
    }))
    .filter(country => country.path);
}

function buildLandPaths(topology) {
  const land = topology.objects.land;
  return land?.geometries
    ? land.geometries.map(geometry => geometryToPath(topology, geometry)).filter(Boolean)
    : [geometryToPath(topology, land)].filter(Boolean);
}

export const COUNTRY_PATHS = buildCountryPaths(countriesTopology);
export const LAND_PATHS = buildLandPaths(countriesTopology);

export function geoPolygonPath(points) {
  return points
    .map(([lng, lat], index) => {
      const { x, y } = projectGeo(lng, lat, MAP_W, MAP_H);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';
}

export function geoLinePath(points) {
  return points
    .map(([lng, lat], index) => {
      const { x, y } = projectGeo(lng, lat, MAP_W, MAP_H);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
}

export function projectLabel(label) {
  return projectGeo(label[0], label[1], MAP_W, MAP_H);
}
