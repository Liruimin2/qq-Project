import {apiGetList} from '@/servers/list';
test('the data is right', async () => {
  await expect(apiGetList('744476113')).resolves.toBe({qq:'',name:'',qlogo:''});
});