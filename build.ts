import fs from 'fs';
import glob from 'glob'
import { spawnSync } from 'child_process'
import { resolve } from 'path'

const OUTPUT = `generated`

const binSuffix = process.platform === "win32" ? ".cmd" : "";
const protoc = `protoc`
const protocPluginPath = resolve(process.cwd(), `node_modules`, `.bin`, `protoc-gen-ts`) + binSuffix;

/**
 * Run function to execute `protoc` as a spawned child
 * @param args 
 */
const run = (...args:string[]) => {
  const result = spawnSync(protoc, args, { shell: true, stdio: "inherit" });
}

const output = resolve(__dirname, OUTPUT);
if(fs.existsSync(output)) fs.rmSync(output, {recursive: true})
fs.mkdirSync(output, {recursive: true})

const protoFilesRe = resolve(__dirname,  "**/*.proto")
const protoPath = resolve(__dirname, `protos`)
const protoFiles = glob.sync(protoFilesRe).filter(a => !a.includes(`/node_modules/`))

run(
  `--proto_path=${protoPath}`,
  `--plugin=./node_modules/.bin/protoc-gen-ts_proto`, 
  // `--ts_proto_opt=grpc-js`,
  // `--ts_proto_opt=env=node`, // generates Buffer instead of Uint8Array
  // `--ts_proto_opt=addGrpcMetadata=true`,
  `--ts_proto_opt=forceLong=string`,
  `--ts_proto_opt=esModuleInterop=true`,
  `--ts_proto_opt=forceLong=long`,
  `--ts_proto_out=${output}`,
  ...protoFiles
)

const capitalize = (input:string) => input[0].toUpperCase()+input.slice(1)

const generateSingleIndex = async (dir:string) => {
  const distFolder = resolve(process.cwd(),OUTPUT)
  const paths = glob.sync(`${distFolder}/${dir}/**/*.ts`)
  
  let result = ``
  paths.map(file => {
    const path = file.replace(distFolder, ``).replace(`.ts`,``);
    const array = `${path}`.replaceAll(`_`,`/`).split(`/`).filter(a => a.length > 0)
    const alias = array.map(capitalize).join(``)
    result += `export * as ${alias} from ".${path}";\n`
  })

  fs.writeFileSync(`${distFolder}/${dir}.ts`, result, {encoding: 'utf8'})
}

const generateIndex = async () => {
  const distFolder = resolve(process.cwd(),OUTPUT)
  const dirs = fs.readdirSync(distFolder)
  
  let result = ``
  dirs.map(dir => {
    generateSingleIndex(dir)
    result += `export * from "./${dir}"\n`
  })
  fs.writeFileSync(`${distFolder}/index.ts`, result, {encoding: 'utf8'})
}

generateIndex()