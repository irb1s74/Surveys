import {FC, lazy} from 'react';
import {AddFormFormProps} from "./AddFormForm";

export const AddFormForm:FC<AddFormFormProps> = lazy(() => import('./AddFormForm'));
