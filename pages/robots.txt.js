import fs from "fs"
import { getDomain } from "../helpers/myFun";
export default () => <></>

export const getServerSideProps = async ({ req, res }) => {

    try {
        const domain = getDomain(req?.headers?.host);


        const robots = fs.readFileSync(`${process.cwd()}/public/${domain}/robots.txt`)

        res.setHeader("Content-Type", "text/plain");
        res.write(robots);
        res.end();

        return {
            props: {}
        }
    } catch (err) {
        console.log(err)
        return {
            notFound: true
        }
    }
}