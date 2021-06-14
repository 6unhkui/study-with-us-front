import { CommentDTO } from "@/api/dto/postComment.dto";
import LTT from "list-to-tree";

export type CommentTree = (CommentDTO & { child?: CommentDTO[] | undefined })[];

export default (data: CommentDTO[]): CommentTree => {
    const ltt = new LTT<CommentDTO>(data, { key_id: "commentId", key_parent: "parentId" });
    return ltt.GetTree();
};
