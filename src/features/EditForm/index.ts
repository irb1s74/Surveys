import {EditFormAsync as EditForm} from "./ui/EditForm.async";
import {EditFormSchema} from "./model/types/editFormSchema";
import {editFormActions} from "./model/slice/editFormSlice";
import {editFormReducer} from "./model/slice/editFormSlice";

export {
    EditForm,
    EditFormSchema,
    editFormActions,
    editFormReducer
}
