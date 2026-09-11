export type KinshipSystemId = "eskimo" | "iroquois";

export const KINSHIP_SYSTEMS: readonly {
  id: KinshipSystemId;
  label: string;
  tease: string;
}[] = [
  {
    id: "eskimo",
    label: "爱斯基摩型",
    tease: "父母的兄弟姊妹与堂表亲被分开。英语 brother / cousin 接近这一型。",
  },
  {
    id: "iroquois",
    label: "易洛魁型",
    tease: "父亲的兄弟与母亲的姊妹并入父母一辈；交叉表亲另成一类。",
  },
];

export type KinTermId = "father" | "mother" | "fb" | "mz" | "mb" | "fz" | "cross" | "parallel";

export const KIN_PEOPLE: readonly {
  id: KinTermId;
  x: number;
  y: number;
  eskimo: string;
  iroquois: string;
  aria: string;
}[] = [
  { id: "father", x: 90, y: 28, eskimo: "父", iroquois: "父", aria: "生父" },
  { id: "mother", x: 150, y: 28, eskimo: "母", iroquois: "母", aria: "生母" },
  { id: "fb", x: 40, y: 28, eskimo: "叔伯", iroquois: "父", aria: "父之兄弟" },
  { id: "mz", x: 200, y: 28, eskimo: "姨", iroquois: "母", aria: "母之姊妹" },
  { id: "mb", x: 230, y: 28, eskimo: "舅", iroquois: "舅", aria: "母之兄弟" },
  { id: "fz", x: 10, y: 28, eskimo: "姑", iroquois: "姑", aria: "父之姊妹" },
  { id: "parallel", x: 70, y: 88, eskimo: "堂/姨表", iroquois: "兄弟姊妹", aria: "平行表亲" },
  { id: "cross", x: 170, y: 88, eskimo: "堂/姑表", iroquois: "交叉表亲", aria: "交叉表亲" },
];
