import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { IClientStore } from '~/core/stores/Client.store';
import styles from './AddVisit.module.scss';
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { IJobStore } from '~/core/stores/Job.store';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface IAddVisit {
  clientStore?: IClientStore;
  jobStore?: IJobStore;
}

const AddVisit: React.FC<IAddVisit> = ({ clientStore, jobStore }) => {
  const { currentClient, currentVisit, createVisit } = clientStore!;
  const { receiveJobList, jobs } = jobStore!;
  const sortedJobs: TJob[] = [...jobs].sort((a: TJob, b: TJob) => a?.name?.localeCompare(b.name));
  const [editingList, setEditingList] = React.useState([]);
  const [formData, setFormData] = React.useState(
    currentVisit ?? {
      comment: '',
      clientId: currentClient?.id,
      jobs: [{ name: '', description: '', price: '', isTemplate: true, done: false }]
    }
  );

  React.useEffect(() => {}, [currentClient, currentVisit]);

  React.useEffect(() => {
    receiveJobList();
  }, [receiveJobList]);

  const handleInputChange = (index, field, value) => {
    const newjobs = [...formData.jobs];
    newjobs[index][field] = value;
    setFormData({
      ...formData,
      jobs: newjobs
    });
  };

  const handleSelectJobs = (index: number, field: keyof TJob, value: string) => {
    const newjobs = [...formData.jobs];
    const selectJob = jobs.find((job) => job.name === value);
    newjobs[index][field] = value;
    newjobs[index]['description'] = selectJob?.description ?? '';
    newjobs[index]['price'] = selectJob?.price ?? '';
    setFormData({
      ...formData,
      jobs: newjobs
    });
  };

  const handleEditJobs = (index, value) => {
    const newEdits = [...editingList];
    newEdits[index] = value;
    console.log(newEdits);
    setEditingList(newEdits);
    handleInputChange(index, 'type', '');
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      comment: e.target.value
    });
  };

  const addInputPair = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      jobs: [
        ...formData.jobs,
        { type: '', description: '', price: '', isTemplate: true, done: false }
      ]
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createVisit(formData);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <form onSubmit={handleSubmit} className={styles.content}>
      <div className={styles.jobsContainer}>
        <div className={styles.addJob}>
          <Button variant="outlined" onClick={(event) => addInputPair(event)}>
            Добавить работу
          </Button>
        </div>
        <div className={styles.job}>
          <div>
            {formData.jobs.map((pair, index) => (
              <div key={index} className={styles.jobs}>
                <Checkbox
                  {...label}
                  style={{ marginLeft: 10 }}
                  icon={<EditOutlinedIcon />}
                  checkedIcon={<EditIcon />}
                  value={pair.isTemplate}
                  onChange={(e) => handleEditJobs(index, e.target.checked)}
                />
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120, maxWidth: 250, width: 250 }}>
                  {!pair.isTemplate ? (
                    <TextField
                      id="standard-basic"
                      label="Выполненная работа"
                      variant="standard"
                      value={pair.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      sx={{ minWidth: 200, maxWidth: 700, width: 700 }}
                    />
                  ) : (
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        Выполненная работа
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={pair.name}
                        onChange={(e) => {
                          handleSelectJobs(index, 'name', e.target.value);
                          handleInputChange(index, 'isTemplate', true);
                        }}
                        label="Работа">
                        <MenuItem value="">
                          <em>Очистить</em>
                        </MenuItem>
                        {sortedJobs?.map((job) => (
                          <MenuItem key={job.id} value={job.name}>
                            {job.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                </FormControl>
                <TextField
                  id="standard-basic"
                  label="Описание"
                  variant="standard"
                  value={pair.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  sx={{ m: 1, minWidth: 200, maxWidth: 700, width: 700 }}
                />
                <TextField
                  id="standard-basic"
                  label="Цена"
                  variant="standard"
                  value={pair.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                  sx={{ m: 1, minWidth: 30, maxWidth: 80 }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.comment}>
          <TextField
            id="outlined-multiline-static"
            // label="Описание"
            multiline
            rows={6}
            fullWidth
            placeholder={'Описание'}
            name="comment"
            value={formData.comment}
            onChange={onChangeComment}
            style={{ marginRight: 20 }}
          />
        </div>
        <Button onClick={handleSubmit} variant="contained" style={{ marginBottom: 20 }}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default inject('clientStore', 'jobStore')(observer(AddVisit));
