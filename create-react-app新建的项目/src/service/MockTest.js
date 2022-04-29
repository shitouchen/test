
import Mock from 'mockjs';


const MockData = Mock.mock('http://lei', {
  'list|5': [{
    'id|+1': 1
  }]
})


export default MockData;